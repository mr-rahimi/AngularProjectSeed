import { KnowledgeModel } from '../knowledge';

export class BookSectionHelpItemModel {
  id: string;
  bookSectionId: string;
  context: string;
  description: string;
  knowledges: KnowledgeModel[];
}
