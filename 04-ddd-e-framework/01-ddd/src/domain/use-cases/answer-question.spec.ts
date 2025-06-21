import { expect, test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../entities/answer"

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test("Create an Answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: "Nova Resposta",
    questionId: "1",
    instructorId: "1",
  })

  expect(answer.content).toEqual("Nova Resposta")
})
