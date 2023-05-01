import React, {ChangeEvent, createRef, FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from './CreateEstablishment.module.css'
import './CreateEstablishment.module.css'
import {useForm} from "react-hook-form";
import './CreateEstablishment.module.css';

import {IEstablishment, ITypeEst} from "../../interfaces/";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {establishmentService} from "../../services/";
import {establishmentActions} from "../../redux";
import {Reorder} from "framer-motion";

interface IFile {
    file: File,
    index: number
}

const CreateEstablishmentPage: FC = () => {
    const {user} = useAppSelector(reducer => reducer.users);
    const navigate = useNavigate();

    const [files, setFiles] = useState<IFile[]>([]);
    const [fileUrl, setFileUrl] = useState<any[]>([]);
    const [types, setTypes] = useState<ITypeEst[]>([]);

    const {register, handleSubmit, reset} = useForm<IEstablishment>();

    const location = useLocation();

    const updatedEstablishment = location.state as IEstablishment;

    const dispatch = useAppDispatch();


    useEffect(() => {
        (async () => {
            if (updatedEstablishment) {
                reset({...updatedEstablishment});
                const urlArray: string[] = [];

                const prevFiles = Promise.all(updatedEstablishment?.photos.map(async (file, index) => {
                    const response = await fetch(`http://localhost:3001/${file}`);

                    const photoName = response?.url?.split('/').pop();

                    const contentType = response.headers.get('content-type');
                    const blob = await response.blob();
                    return {file: new File([blob], photoName!, {type: contentType!}), index};
                }));

                Array.from(await prevFiles).forEach((value, index) => urlArray.push(URL.createObjectURL(value.file) + `#index=${index}`));

                setFiles(await prevFiles);

                setFileUrl([...urlArray]);
            }
        })()
    }, [updatedEstablishment])

    useEffect(() => {
        const orderIndex = fileUrl.map(value => value?.split('=').pop());

        const reorderedArray = files.sort((a, b) => orderIndex.indexOf(a.index.toString()) - orderIndex.indexOf(b.index.toString()));
        setFiles([...reorderedArray]);

    }, [fileUrl]);

    useEffect(() => {
        establishmentService.getType().then(({data}) => setTypes(data))
    }, [])


    const onSubmit = async (data: IEstablishment) => {
        const formData = new FormData();
        if (user?.user_id) {
            files.map(photo => formData.append('files', photo.file));
            if(data.tags.length){
                if (!Array.isArray(data.tags)) {
                    formData.append('data', JSON.stringify({...data, tags: data.tags.split(',')}));
                } else {
                    formData.append('data', JSON.stringify({...data}));
                }
            }
            else {
                formData.append('data', JSON.stringify({...data, tags:''}));
            }


            formData.append('user_id', user.user_id.toString())

            updatedEstablishment ? await establishmentService.putOne(updatedEstablishment.establishment_id, formData).finally(()=>dispatch(establishmentActions.getAllEstablishments({limit:8})))
                .finally(()=>navigate('/my-establishments')): await establishmentService.postOne(formData).finally(()=>navigate('/my-establishments'));
        }
        else {
            navigate('/auth-request');
        }
    }

    const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = e.target.files;

            const urlArray: string[] = [];

            Array.from(fileList).forEach((value, index) => urlArray.push(URL.createObjectURL(value) + `#index=${fileUrl.length + index}`));

            setFileUrl([...fileUrl, ...urlArray]);

            const filesWithId = Array.from(fileList).map((file, index) => {
                return {file, index: fileUrl.length + index};
            })

            setFiles([...files, ...filesWithId]);
        }
    }

    const deleteRef = createRef<HTMLDivElement>();
    const [clicked, setClicked] = useState(false);

    const deleteAvatar = (photo: string[]) => {
        setClicked(true);
        const filteredFiles = Array.from(files).filter(value => value.index !== +photo[0].split('=')[1]);

        setFiles(filteredFiles.map((value, index) => {
            return {file: value.file, index}
        }));
    }

    useEffect(() => {
        setFileUrl(Array.from(files).map((value, index) => URL.createObjectURL(value.file) + `#index=${index}`));
        setClicked(false);
    }, [clicked]);

    const uploadFile = () => {
        document.getElementById('input-file')!.click()
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateEstablishmentForm}
                  encType="multipart/form-data">

                <div className={styles.DetailSection}>
                    {updatedEstablishment ? <h2>Update an establishment</h2> : <h2>Create an establishment</h2>}
                    <h3>Describe in detail</h3>
                    <label color="charcoal" htmlFor="title" className="css-ha5hu8">Enter the name of the
                        establishment*</label>
                    <input {...register("title")} type="text" name={'title'} placeholder={'Enter the title'}/>
                    <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the type of the
                        establishment*</label>
                    <select {...register("type")} name="type">
                        {
                            updatedEstablishment ?
                                <option value={updatedEstablishment?.type}>{updatedEstablishment?.type}</option>
                                :
                                <option value={''} hidden></option>
                        }
                        {
                            types.map((value) => <option key={value.type_id} value={value.title}>{value.title}</option>)
                        }
                    </select>

                    <label color="charcoal" htmlFor="tags" className="css-ha5hu8">Enter the tags of the
                        establishment*</label>
                    <input {...register("tags")} type="text" name={'tags'} placeholder={'Enter the tags'}/>
                    <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the establishment's opening
                        hours*</label>
                    <input hidden id={'input-file'} onChange={(e) => handleImg(e)} type="file" multiple
                           accept="image/*"/>
                    <input {...register("start_work")} type="time" name={'start_work'}
                           placeholder={'start work'}/>
                    <input hidden type="file" id={'input-file'} placeholder={'photo'} accept="image/*"
                           multiple
                    />
                    <input {...register("end_work")} type="time" name={'end_work'}
                           placeholder={'end work'}/>
                    <input {...register("average_check")} name={'average_check'} placeholder={'average check'}
                           type="number"/>
                </div>

                {<div className={styles.PhotoSection}>
                    <h3>Photo</h3>

                    <h6>The first photo will be on the cover of the ad. Drag to reorder</h6>
                    <Reorder.Group style={{overflow: "hidden"}} className={styles.PhotosWrap} onReorder={setFileUrl}
                                   axis={'x'} values={fileUrl}>
                        {
                            (() => {
                                let photos = [];
                                for (let i = 0; i < 6; i++) {
                                    if (fileUrl[i]) {
                                        photos.push(

                                            <Reorder.Item as={"div"}
                                                          className={styles.DivPhotos} value={fileUrl[i]} style={{
                                                background: `url(${fileUrl[i].replace(/\\/g, '/')}) no-repeat`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: "center",
                                            }} key={fileUrl[i]} a-key={i} whileDrag={{cursor: "move"}}>
                                                <div ref={deleteRef} onClick={() => deleteAvatar([fileUrl[i]])}
                                                     className={`${styles.Delete}`} id={`delete${i}`}>
                                                    <img className={styles.DeleteBucket} src={'../delete.svg'} alt=""/>
                                                </div>
                                                <div className={`${styles.MainPhoto}`}><h6>Головна</h6></div>
                                            </Reorder.Item>
                                        );
                                    } else {
                                        photos.push(<div key={i} onClick={() => uploadFile()} className={styles.AddPhoto}
                                                         style={{
                                                             background: `url(../add-photo.png)`,
                                                             backgroundSize: 'cover',
                                                             backgroundPosition: "center"
                                                         }}/>)
                                    }
                                }
                                return photos;
                            })()}
                    </Reorder.Group>
                </div>}


                <div className={styles.ContactSection}>
                    <h3>Contact information</h3>
                    <input {...register("location")} type="text"
                           name={'location'} placeholder={'location'}/>

                    <input {...register("phone")} name={'phone'} placeholder={'phone'} type="text"/>
                </div>

                {updatedEstablishment ?
                    <div className={styles.SubmitSection}>
                        <button>Edit</button>
                    </div>
                    :
                    <div className={styles.SubmitSection}>
                        <button>Post</button>
                    </div>
                }
            </form>
        </div>
    )
        ;
}

export default CreateEstablishmentPage;