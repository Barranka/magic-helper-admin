import { useNotification } from 'naive-ui';

export function useNotify() {
  const notification = useNotification();

  const notifySuccess = (message?: string) => {
    notification.success({
      content: message || 'Запрос успешно отправлен',
      duration: 2500,
      keepAliveOnHover: true,
    });
  };

  const notifyError = (error: unknown) => {
    let message = '';

    switch (true) {
      case error instanceof Error:
        message = error.message;
        break;
      case typeof error === 'string':
        message = error;
        break;
      default:
        message = 'Произошла ошибка';
    }

    notification.error({
      content: message,
      duration: 2500,
      keepAliveOnHover: true,
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
