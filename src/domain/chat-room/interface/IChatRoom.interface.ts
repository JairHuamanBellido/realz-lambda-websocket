export interface IChatRoom {
  readonly id: string;
  readonly owner_id: string;
  readonly title: string;
  readonly black_list_words: Array<string>;
  readonly connections_ids: Array<string>;
}
