import { showNotification, updateNotification } from "@mantine/notifications";
import { IconBan, IconCheck, IconCoffee } from "@tabler/icons-react";

export const showLoading = (title, message?) => {
  showNotification({
    id: "load-data",
    loading: true,
    title,
    message,
    autoClose: false
  });
};

export const updateSuccess = (title, message?) => {
  updateNotification({
    id: "load-data",
    color: "teal",
    title,
    message,
    icon: <IconCheck />,
    autoClose: 2000,
  });
};

export const updateError = (title, message?) => {
  updateNotification({
    id: "load-data",
    color: "red",
    title,
    message,
    icon: <IconBan />,
    autoClose: 3000,
  });
};

export const showError = (title, message?) => {
  showNotification({
    id: "load-data",
    color: "red",
    title,
    message,
    icon: <IconBan />,
    autoClose: 3000,
  });
};

export const showSuccess = (title, message?) => {
  showNotification({
    id: "load-data",
    color: "teal",
    title,
    message,
    icon: <IconCheck />,
    autoClose: 2000,
  });
};

export const showInfo = (title, message?) => {
  showNotification({
    id: "info",
    color: "teal",
    title,
    message,
    icon: <IconCoffee />,
    autoClose: 2000,
  });
};
