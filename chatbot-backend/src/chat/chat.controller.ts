import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto, ChatResponseDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async chat(@Body() chatRequest: ChatRequestDto): Promise<ChatResponseDto> {
    return this.chatService.processChat(chatRequest);
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok', message: 'Chat service is running' };
  }
}
