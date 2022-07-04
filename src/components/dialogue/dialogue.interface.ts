
export enum TypeEnum {
  对话 = 1,
  独白 = 2,
  图片 = 3
}

export enum DirectionEnum {
  联系人 = 1,
  主人 = 2,
  选项 = 3,
  旁白 = 4,
}

export interface IDataSource {
  direction: DirectionEnum;
  id: number | string;
  type?: TypeEnum;
  content: string | Array<{nextId: string | number, option: string}>; // type==1--文本消息，type==3--图片地址；direction==3--选项
  choiceTitle?: string;
}
