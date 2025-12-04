export class MessageDto {
  role: string;
  content: string;
}

export class ChatRequestDto {
  messages: MessageDto[];
}
