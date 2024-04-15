import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MyGateway implements OnGatewayInit {
	private _logger: Logger = new Logger('Gateway');

	@WebSocketServer()
	server: Server;

	afterInit() {
		this.server.on('connection', (socket) => {
			this._logger.log('Connected', socket.id);
		});
	}

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		console.log('body', body);
		this.server.emit('message', {
			msg: 'new message',
			content: body,
		});
	}
}
