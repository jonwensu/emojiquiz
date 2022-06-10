import React, { ReactNode } from 'react';

export type PropsWithChildren<P = {}> = React.FC<P & { children: ReactNode }>;
