import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GooglePubSubContext } from '../ctx-host';

/**
 * Retrieves the ack function from the received message
 * and disables auto ack.
 */
export const GooglePubSubMessageAck = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): (() => void) => {
        const pubSubCtx: GooglePubSubContext = ctx.switchToRpc().getContext();
        const message = pubSubCtx.getMessage();
        pubSubCtx.setAutoAck(false);
        return message.ack.bind(message);
    },
);
