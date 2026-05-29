import { createHashRouter, redirect } from 'react-router';
import { QuestionsLearnPage } from './pages/learning/questions.learn.page';
import { QuestionsExamPage } from './pages/exam/questions.exam.page';
import { FishLearnPage } from './pages/learning/fishes.learn.page';
import { FishExamPage } from './pages/exam/fishes.exam.page';
import App from './App';

export const routes = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        loader: () => redirect('/questions/learn'),
      },
      {
        path: 'questions',
        children: [
          {
            path: 'learn',
            Component: QuestionsLearnPage,
          },
          {
            path: 'exam',
            Component: QuestionsExamPage,
          },
        ],
      },
      {
        path: 'fishes',
        children: [
          {
            path: 'learn',
            Component: FishLearnPage,
          },
          {
            path: 'exam',
            Component: FishExamPage,
          },
        ],
      },
    ],
  },
]);
