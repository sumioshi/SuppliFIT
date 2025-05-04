import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

// Use em toda a aplicação em vez do plain `useDispatch` e `useSelector`
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 