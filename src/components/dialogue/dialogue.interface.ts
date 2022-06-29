
export enum TypeEnum {
  文本 = 1,
  图片 = 2,
  选项 = 3
}

export enum DirectionEnum {
  联系人 = 1,
  主人 = 2
}

export interface IDataSource {
  direction: DirectionEnum;
  id: number | string;
  type: TypeEnum;
  content: string; // 当type为1时这里是文本消息，当type2为2时这里要存放图片地址；后续会支持语音的显示
  ctime: string; // 显示当前消息的发送时间
}
