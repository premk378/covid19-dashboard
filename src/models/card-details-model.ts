export class CardDetail {
  header: string;
  meta: string;
  description: string;
  jsonTag: string;

  constructor(header,meta,description,jsonTag) {
    this.header = header;
    this.meta = meta;
    this.description = description;
    this.jsonTag = jsonTag;
  }

}
