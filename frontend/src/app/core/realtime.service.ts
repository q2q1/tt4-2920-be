import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { TaskItem } from './models';

type ClientToServerEvents = Record<string, never>;

interface ServerToClientEvents {
  connected: (payload: { userId: string }) => void;
  'task:created': (payload: { task: TaskItem }) => void;
  'task:updated': (payload: { task: TaskItem }) => void;
  'task:deleted': (payload: { taskId: string }) => void;
}

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private readonly auth = inject(AuthService);
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  connect(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
    const token = this.auth.token();
    if (!token) {
      this.disconnect();
      return null;
    }

    if (this.socket?.connected) {
      return this.socket;
    }

    this.disconnect();

    this.socket = io(environment.apiUrl, {
      transports: ['websocket'],
      auth: { token },
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

