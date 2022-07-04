
export enum TypeEnum {
  文本 = 1,
  图片 = 2,
  旁白 = 3
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
  content: string | Array<{nextId: string | number, option: string}>; // type==1--文本消息，type==2--图片地址；direction==3--选项
}
