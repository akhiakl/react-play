'use client';
import { NhostProvider, NhostClient } from '@nhost/nextjs';
import React from 'react';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

type Props = {
  children: React.ReactNode;
};

const Nhost = ({ children }: Props) => <NhostProvider nhost={nhost}>{children}</NhostProvider>;

export default Nhost;
