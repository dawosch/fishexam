import { createHashRouter } from 'react-router';
import { QuestionsLearnPage } from './pages/learning/questions.learn.page';
import { QuestionsExamPage } from './pages/exam/questions.exam.page';
import App from './App';
import { FishLearnPage } from './pages/learning/fishes.learn.page';

export const routes = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
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
            Component: QuestionsExamPage,
          },
        ],
      },
    ],
  },
]);
