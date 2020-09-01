import { HelpItemModel } from "./helpItemModel";

export class BookSectionViewModel {
  id: string;
  introduction?: string;
  introductionTitle?: string;
  passage?: string;
  passageTitle?: string;
  imageUrl?: string;
  helpItems: HelpItemModel[];
  experienceId?: string;
  lastChallengeTime: string;
  nextSectionId: string;
  prevSectionId: string;
}
