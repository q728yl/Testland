import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex } from '@chakra-ui/react';


const MarkdownPreview = (props) => {
    const {content}=props;
    return (
        <Flex w="800px">
      <ReactMarkdown >
        {`
test text
`}
      </ReactMarkdown>
      </Flex>
    );
  };

export default MarkdownPreview;
