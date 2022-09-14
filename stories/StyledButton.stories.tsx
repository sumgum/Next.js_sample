import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StyledButton } from "../components/StyledButton";
// カスタムActionを使用する場合はインポート
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";

// ファイル内のStoryの設定（メタデータオブジェクト）
export default {
  // グループ名
  title: "StyledButton",
  // 使用するコンポーネント
  component: StyledButton,
  argTypes: {
    onClick: { action: "clicked" },
    // propsに渡すvariantをStorybookから変更できるように追加
    variant: {
      // ラジオボタンで設定できるように指定
      control: { type: "radio" },
      options: ["primary", "success", "transparent"],
    },
    // propsに渡すchildrenをStorybookから変更できるように追加
    children: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof StyledButton>;

// テンプレートコンポーネントを実装
// Storybookから渡されたpropsをそのままButtonに渡す
const Template: ComponentStory<typeof StyledButton> = (args) => (
  <StyledButton {...args} />
);

// bindを呼び出しStoryを作成
export const TemplateTest = Template.bind({});

// デフォルトのpropsを設定する
TemplateTest.args = {
  variant: "primary",
  children: "Primary",
};

// incrementという名前でactionを出力するための関数をつくる
const incrementAction = action("increment");

export const Primary = (props: any) => {
  const [count, setCount] = useState(0);
  const onClick = (e: React.MouseEvent) => {
    incrementAction(e, count);
    setCount((c) => c + 1);
  };
  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Primary: {count}
    </StyledButton>
  );
};

export const Success = (props: any) => {
  return (
    <StyledButton {...props} variant="success">
      Success
    </StyledButton>
  );
};

export const Transparent = (props: any) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  );
};
