'use client';
import { Button, Divider, Modal, TextInput, NumberInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React from 'react';

type Props = {};

export default function page({}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal opened={opened} onClose={close} title="New Product">
        <form>
          <TextInput placeholder="Title" label="Title" withAsterisk />
          <TextInput mt="xs" placeholder="About" label="About" withAsterisk />
          <NumberInput
            mt="xs"
            defaultValue={18}
            placeholder="Starting Price"
            label="Starting Price $"
            withAsterisk
          />
          <Button type="submit" variant="default" color="grape" mt="xs">
            {' '}
            Generate{' '}
          </Button>
        </form>
      </Modal>

      <div className="mt-4">
        <Button onClick={open} variant="default">
          New Product +
        </Button>
        
      </div>

      <h1 className='mt-3'>My Products</h1>
      <Divider />
    </div>
  );
}
