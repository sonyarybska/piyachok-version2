import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Establishment } from '../models/establishment.model';
import { Review } from '../models/review.model';
import sequelize, { Op } from 'sequelize';
import { ApiError } from '../errors/CustomError';
import { User } from '../models/user.model';

@Injectable()
export class EstablishmentQueryParamService {
  constructor(
    @InjectModel(Establishment)
    private establishmentRepository: typeof Establishment,
    @InjectModel(Review)
    private reviewRepository: typeof Review,
  ) {}

  async find(query) {
    try {
      const {
        limit = 12,
        page = 1,
        title,
        sort = null,
        type = null,
        filterByRating = null,
        filterByCheck = null,
        pending = null,
        approved = null,
        rejected = null,
      } = query;

      let betweenCheck;
      let betweenRating;

      if (filterByCheck) {
        betweenCheck = filterByCheck
          .split('-')[1]
          .split(',')
          .map((i) => Number(i));
      }

      if (filterByRating) {
        betweenRating = filterByRating
          .split('-')[1]
          .split(',')
          .map((i) => Number(i));
      }

      let findObj = {};
      let establishments;

      if (pending) {
        establishments = await Establishment.findAll({
          where: { pending: true },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (title && !type && !sort && !filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          approved: true,
        };
        establishments = await Establishment.findAll({
          where: findObj,
          limit,
          offset: (page - 1) * limit,
        });
      } else if (title && type && !sort && !filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          type,
          approved: true,
        };
        establishments = await Establishment.findAll({
          where: findObj,
          limit,
          offset: (page - 1) * limit,
        });
      } else if (title && !type && sort && !filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          approved: true,
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (title && type && sort && !filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          type,
          approved: true,
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (title && type && sort && filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          type,
          approved: true,
          average_check: { [Op.between]: betweenCheck },
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (title && type && sort && filterByCheck && filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          type,
          approved: true,
          average_check: { [Op.between]: betweenCheck },
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (title && !type && !sort && !filterByCheck && filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          approved: true,
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          group: [sequelize.col('Establishment.establishment_id')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (title && !type && !sort && filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          approved: true,
          average_check: { [Op.between]: betweenCheck },
        };
        establishments = await Establishment.findAll({
          where: findObj,
          limit,
          offset: (page - 1) * limit,
        });
      } else if (title && !type && sort && filterByCheck && !filterByRating) {
        findObj = {
          ...findObj,
          title: { [Op.iRegexp]: title },
          approved: true,
          average_check: { [Op.between]: betweenCheck },
        };
        establishments = await Establishment.findAll({
          where: findObj,
          include: [
            {
              model: Review,
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (
        approved &&
        !filterByRating &&
        !filterByCheck &&
        !sort &&
        !type
      ) {
        establishments = await Establishment.findAll({
          where: { approved: true },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (
        pending &&
        !filterByRating &&
        !filterByCheck &&
        !sort &&
        !type
      ) {
        establishments = await Establishment.findAll({
          where: { pending: true },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (
        rejected &&
        !filterByRating &&
        !filterByCheck &&
        !sort &&
        !type
      ) {
        establishments = await Establishment.findAll({
          where: { rejected: true },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (filterByRating && !filterByCheck && !sort && !type) {
        establishments = await Establishment.findAll({
          where: { approved: true },
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          group: sequelize.col('Establishment.establishment_id'),
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (filterByCheck && !filterByRating && !sort && !type) {
        establishments = await Establishment.findAll({
          where: {
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (filterByRating && filterByCheck && !type && !sort) {
        establishments = await Establishment.findAll({
          where: {
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          group: sequelize.col('Establishment.establishment_id'),
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (sort && !type && !filterByRating && !filterByCheck) {
        establishments = await Establishment.findAll({
          where: { approved: true },
          include: [
            {
              model: Review,
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (sort && !type && filterByRating && !filterByCheck) {
        establishments = await Establishment.findAll({
          where: { approved: true },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (sort && !type && !filterByRating && filterByCheck) {
        establishments = await Establishment.findAll({
          where: {
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (sort && !type && filterByRating && filterByCheck) {
        establishments = await Establishment.findAll({
          where: {
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          subQuery: false,
          offset: (page - 1) * limit,
        });
      } else if (sort && type && !filterByRating && !filterByCheck) {
        establishments = await Establishment.findAll({
          where: { type, approved: true },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && filterByRating && filterByCheck && sort) {
        establishments = await Establishment.findAll({
          where: {
            type,
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          order: [sort.split('-')],
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && filterByRating && !filterByCheck && !sort) {
        establishments = await Establishment.findAll({
          where: { type, approved: true },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && !filterByRating && filterByCheck && !sort) {
        establishments = await Establishment.findAll({
          where: {
            type,
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && filterByRating && filterByCheck && !sort) {
        establishments = await Establishment.findAll({
          where: {
            type,
            approved: true,
            average_check: { [Op.between]: betweenCheck },
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && !filterByRating && filterByCheck && sort) {
        establishments = await Establishment.findAll({
          where: {
            type,
            average_check: { [Op.between]: betweenCheck, approved: true },
          },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && filterByRating && !filterByCheck && sort) {
        establishments = await Establishment.findAll({
          where: { type, approved: true },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          order: [sort.split('-')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          limit,
          offset: (page - 1) * limit,
        });
      } else if (type && filterByRating && filterByCheck && sort) {
        establishments = await Establishment.findAll({
          where: { type, approved: true },
          include: [
            {
              model: Review,
              as: 'review',
              attributes: [],
            },
          ],
          subQuery: false,
          attributes: {
            include: [
              [
                sequelize.fn(
                  'coalesce',
                  sequelize.fn('AVG', sequelize.col('review.rating')),
                  1,
                ),
                'avgRating',
              ],
            ],
            exclude: [],
          },
          group: [sequelize.col('Establishment.establishment_id')],
          having: sequelize.literal(
            `coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`,
          ),
          order: [sort.split('-')],
          limit,
          offset: (page - 1) * limit,
        });
      } else if (
        type &&
        type.length &&
        !sort &&
        !filterByRating &&
        !filterByCheck
      ) {
        establishments = await Establishment.findAll({
          where: { type, approved: true },
          limit,
          offset: (page - 1) * limit,
        });
      } else {
        establishments = await Establishment.findAll({
          limit,
          offset: (page - 1) * limit,
        });
      }

      const count = await Establishment.count();

      const maxCheck = await Establishment.max('average_check');

      return {
        establishments,
        count,
        maxCheck,
      };
    } catch (e) {
      throw new ApiError(e.message, 400);
    }
  }

  async findByUserId(query, id) {
    try {
      const {
        limit = 12,
        page = 1,
        approved = false,
        pending = false,
        rejected = false,
      } = query;

      let establishments;

      if (approved) {
        establishments = await Establishment.findAll({
          where: { user_id: id, approved: true },
          limit,
          offset: (page - 1) * limit,
          include: User,
        });
      } else if (pending) {
        establishments = await Establishment.findAll({
          where: { user_id: id, pending: true },
          limit,
          offset: (page - 1) * limit,
          include: User,
        });
      } else if (rejected) {
        establishments = await Establishment.findAll({
          where: { user_id: id, rejected: true },
          limit,
          offset: (page - 1) * limit,
          include: User,
        });
      } else {
        establishments = await Establishment.findAll({
          limit,
          offset: (page - 1) * limit,
          include: User,
        });
      }

      const count = await Establishment.count({ where: { user_id: id } });

      return {
        establishments,
        count,
      };
    } catch (e) {
      throw new ApiError(e.message, 400);
    }
  }
}
