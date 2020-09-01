class Question {
  isRtl: false;
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
 const SingleSelectQuestionType = "MultipleChoiceSingleSelect";
 const MultipleSelectQuestionType = "MultipleChoiceMultipleSelect";
export const challengeTypes = {
  MultipleSelectQuestionType,
  SingleSelectQuestionType
};
