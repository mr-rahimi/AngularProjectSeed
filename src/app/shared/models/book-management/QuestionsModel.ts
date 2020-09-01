class Question {
  isRtl = false;
  description: string;
  options: { [key: number]: string };
}
export class SingleSelectQuestion {
  question: Question;
  response: number;
}
export class MultipleSelectQuestion {
  question: Question;
  response: number[];
}
export const SingleSelectQuestionType = "MultipleChoiceSingleSelect";
export const MultipleSelectQuestionType = "MultipleChoiceMultipleSelect";
export const challengeTypes = {
  MultipleSelectQuestionType,
  SingleSelectQuestionType
};
