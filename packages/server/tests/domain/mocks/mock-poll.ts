import { AddPoll, ShowPoll } from "@/domain/usecases";
import { AddPollController } from "@/presentation/controllers"
import { faker } from "@faker-js/faker";

export const mockAddPollControllerParam = (): AddPollController.Request => ({
  title: faker.lorem.words(5),
  question: faker.lorem.paragraph(1),
  options: [
    {
      description: faker.lorem.words(5),
      votes: 0
    },
    {
      description: faker.lorem.words(5),
      votes: 0
    }
  ],
  is_multiple: faker.helpers.maybe(() => 1, { probability: 0.5 }) === 1,
  can_change_vote: false,
  show_results_after_much_votes: 1,
  start_at: faker.date.anytime(),
  end_at: faker.date.future(),
});

export const mockPollResult = (): AddPoll.Result | ShowPoll.Result => ({
  id: 'any_id',
  title: faker.lorem.words(5),
  question: faker.lorem.paragraph(1),
  options: [
    {
      id: 'any_id',
      poll_id: 'any_id',
      description: faker.lorem.words(5),
      votes: 0
    },
    {
      id: 'any_id',
      poll_id: 'any_id',
      description: faker.lorem.words(5),
      votes: 0
    }
  ],
  is_multiple: faker.helpers.maybe(() => 1, { probability: 0.5 }) === 1,
  can_change_vote: false,
  show_results_after_much_votes: 1,
  start_at: faker.date.anytime(),
  end_at: faker.date.future(),
  created_at: faker.date.anytime(),
});

