import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EVote } from 'common/types/enums';
import VoteReview from './entities/vote-review.entity';

@Injectable()
export class VoteReviewService {
  constructor(
    @InjectModel(VoteReview)
    private readonly voteReviewModel: typeof VoteReview,
  ) {}

  async findByTwoForeign(
    reviewId: string,
    accountId: string,
  ): Promise<VoteReview | null> {
    return await this.voteReviewModel.findOne({
      where: {
        reviewId,
        accountId,
      },
    });
  }

  async findsByReview(reviewId: string): Promise<VoteReview[]> {
    return await this.voteReviewModel.findAll({
      where: {
        reviewId,
      },
    });
  }

  async findsByAccount(accountId: string): Promise<VoteReview[]> {
    return await this.voteReviewModel.findAll({
      where: {
        accountId,
      },
    });
  }

  async unVote(id: string): Promise<string> {
    await this.voteReviewModel.destroy({
      where: {
        id,
      },
    });
    return 'UnVote success!';
  }

  async isVoted(reviewId: string, accountId: string): Promise<boolean> {
    const vote = await this.voteReviewModel.findOne({
      where: {
        reviewId,
        accountId,
      },
    });
    return vote !== null;
  }

  async deleteVote(reviewId: string, accountId: string): Promise<string> {
    await this.voteReviewModel.destroy({
      where: {
        reviewId,
        accountId,
      },
    });
    return 'Delete success!';
  }

  async create(
    status: EVote,
    reviewId: string,
    accountId: string,
  ): Promise<VoteReview> {
    return await this.voteReviewModel.create({
      reviewId,
      accountId,
      status,
    });
  }

  async finds(): Promise<VoteReview[]> {
    return await this.voteReviewModel.findAll();
  }
}
