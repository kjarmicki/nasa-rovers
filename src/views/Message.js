import React from 'react';
import { shape, string, number } from 'prop-types';
import classNames from 'classnames';

export default function Message(props) {
  const { type } = props;
  const messageClass = classNames('message', {
    [`type-${type}`]: Boolean(type),
  });
  let { message } = props;
  if (props.error) {
    message = `An error has occured: ${props.error.message}.`;
    if (props.error.status === 429) {
      message += ' This is most likely due to using default NASA API demo key, ' +
        'please check "Configuration" section in the readme.';
    }
  }
  return (
    <div className={messageClass}>
      {message}
    </div>
  );
}

Message.propTypes = {
  type: string,
  message: string,
  error: shape({
    message: string,
    status: number,
  }),
};
