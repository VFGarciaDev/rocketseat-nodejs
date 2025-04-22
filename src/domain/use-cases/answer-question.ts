import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

type AnswerQuestionUseCaseRequest = {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ content, instructorId, questionId }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      questionId,
      authorId: instructorId,
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
