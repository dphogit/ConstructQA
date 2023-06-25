import { ActionIcon, Flex, Group, Navbar, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { HealthCheck } from '@/features/health-check';

const GITHUB_REPO_URL = 'https://github.com/dphogit/ConstructQA';

export const SIDEBAR_WIDTH = 260;

export function AppSidebar() {
  return (
    <Navbar px="xl" py={32} width={{ base: SIDEBAR_WIDTH }}>
      <Flex
        direction="column"
        justify="space-between"
        h="100%"
        align="flex-start"
      >
        <Title order={1} size="h2">
          👷‍♂️ ConstructQA
        </Title>
        <Group position="apart" w="100%">
          <HealthCheck />
          <ActionIcon
            variant="outline"
            radius="md"
            component="a"
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="norefferer"
          >
            <IconBrandGithub size={16} />
          </ActionIcon>
        </Group>
      </Flex>
    </Navbar>
  );
}
