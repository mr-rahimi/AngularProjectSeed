import { KnowledgeModel } from '../knowledge';

export class HelpItemModel {
  id: string;
  context: string
  knowledges: KnowledgeModel[];
  description: string
}
