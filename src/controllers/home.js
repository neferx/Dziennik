import { testEnvironmentVariable } from '../settings';

export const indexPage = (req, res) =>
  res.status(200).json({ message: 'test' });

export const testowy = (req, res) =>
  res.status(200).json({ message: testEnvironmentVariable });
