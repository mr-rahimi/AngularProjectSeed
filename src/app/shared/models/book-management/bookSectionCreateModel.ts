export class BookSectionCreateModel {
  bookId: string;
  introductionTitle: string;
  imageUrl: string;
  // Before | After
  placement: string;
  sectionId: string;
  // Last | First
  relativeSection: string;
}
