import React, { useRef } from 'react';
import { Box, Button, Flex, Table, Text, Textarea } from '@mantine/core';
import { useSearch } from '../api/search.tsx';

// TODO This will need to be adapted for obtaining the answer rather than just
// searching/displaying for relevant documents - will be done when BE is ready.
export function QuestionAnswer() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const searchMutation = useSearch();

  function searchSimilarResults() {
    const query = textAreaRef.current?.value.trim();
    if (!query) return;
    searchMutation.mutate(query);
  }

  function checkForKeyboardEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      searchSimilarResults();
    }
  }

  return (
    <Box>
      <Textarea
        ref={textAreaRef}
        onKeyDown={checkForKeyboardEnter}
        placeholder="Ask ConstructQA a question"
        autosize
      />
      <Flex justify="flex-end" my="sm">
        <Button size="sm" onClick={searchSimilarResults}>
          Ask
        </Button>
      </Flex>
      {searchMutation.isLoading && <Text align="center">Searching...</Text>}
      {searchMutation.isError && (
        <Text align="center">Error loading search results</Text>
      )}
      {/* TODO If we want to keep the similar search table then we should
       style, make look nice etc. and obv separate it into own component.*/}
      {searchMutation.data &&
        (searchMutation.data.length === 0 ? (
          <Text align="center">No Results Found</Text>
        ) : (
          <Box>
            <Text fw="bold" size="lg" align="center" mb="md">
              Results
            </Text>
            <Table verticalSpacing="md">
              <thead>
                <tr>
                  <th>Clause</th>
                  <th>Content</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {searchMutation?.data.map((result) => (
                  <tr key={result.payload.clause}>
                    <td>{result.payload.clause}</td>
                    <td>{result.payload.content}</td>
                    <td>{result.score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        ))}
    </Box>
  );
}
