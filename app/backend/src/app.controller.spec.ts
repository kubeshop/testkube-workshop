import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root - health', () => {
    it('should return status ok', () => {
      expect(appController.check()).toStrictEqual({ status: 'ok' });
    });
  });
});
