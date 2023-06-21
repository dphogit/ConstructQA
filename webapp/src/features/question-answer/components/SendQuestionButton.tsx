import { IconSend } from '@tabler/icons-react';
import { ActionIcon, createStyles } from '@mantine/core';

const useStyles = createStyles({
  sendButton: {
    transition: 'all 200ms ease',
  },
  sendIcon: {
    transform: 'rotate(45deg)',
    marginRight: 6,
  },
});

interface SendQuestionButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function SendQuestionButton({
  disabled,
  onClick,
}: SendQuestionButtonProps) {
  const { classes } = useStyles();

  return (
    <ActionIcon
      className={classes.sendButton}
      aria-label="Send Question"
      radius="md"
      color="blue"
      size="lg"
      variant="filled"
      disabled={disabled}
      onClick={onClick}
    >
      <IconSend size="1.25rem" className={classes.sendIcon} />
    </ActionIcon>
  );
}
