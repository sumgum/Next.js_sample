import { fireEvent } from '@storybook/testing-library';
import { screen, render, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { DelayInput } from './index';

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // タイマーをjestのものに置き換える
    jest.useFakeTimers();

    // モック関数を作成する
    // jest.fn()はモック関数を作成する関数で、コールバックが呼ばれたかどうかなどをテストできる
    handleChange = jest.fn();

    // モック関数をDelayButtonに渡して描画
    renderResult = render(<DelayInput onChange={handleChange} />);
  });

  afterEach(() => {
    renderResult.unmount();

    // タイマーを元のものに戻す
    jest.useRealTimers();
  });

  // 今回テストは4つ作成
  // 初期表示は空
  // 入力直後は「入力中...」と表示される
  // 入力して１秒経過した後に入力内容が反映される
  // 入力して１秒経過した後にonChangeコールバックがよばれる

  // span要素のテキストが空であることをテスト
  it('should display empty in span on initial render', () => {
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // 初期表示は空
    expect(spanNode).toHaveTextContent('入力したテキスト：');
  });

  // 入力直後は「入力中...」と表示されるテスト
  it('should display 「入力中...」 immediately after onChange event occurs', () => {
    const inputText = 'Test input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } });

    // 入力中と表示するか確認
    expect(spanNode).toHaveTextContent('入力中...');
  });

  // 入力して１秒経過した後に入力内容が反映されるテスト
  it('should display input text 1 second after onChange event occurs', async () => {
    const inputText = 'Test input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } });

    // act関数内で実行することにより、タイマーのコールバック中で起きる状態変更が反映されることを保証する
    await act(() => {
      // タイマーにセットされたtimeoutをすべて実行する
      jest.runAllTimers();
    });

    // 入力したテキストがあるか確認
    expect(spanNode).toHaveTextContent(`入力したテキスト：${inputText}`);
  });

  // 入力して１秒経過した後にonChangeコールバックがよばれるかテスト
  it('should call onChange 1 second after onChange event occurs', async () => {
    const inputText = 'Test input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } });

    await act(() => {
      // タイマーにセットされたtimeoutをすべて実行する
      jest.runAllTimers();
    });

    // モック関数を渡し、よばれたか確認する
    expect(handleChange).toHaveBeenCalled();
  });
});
