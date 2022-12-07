```json
  "Context 있는 Tailwind 컴포넌트": {
    "prefix": "tccontext",
    "body": [
      "interface ${2:${TM_FILENAME_BASE}}ContextValue {}",
      "",
      "const ${2:${TM_FILENAME_BASE}}Context = createContext<${2:${TM_FILENAME_BASE}}ContextValue | null>(null);",
      "",
      "const use${2:${TM_FILENAME_BASE}}Context = () => {",
      "  const ctx = useContext(${2:${TM_FILENAME_BASE}}Context);",
      "",
      "  if (!ctx) {",
      "    throw new Error('Test 컴포넌트 안에서만 쓰여야합니다!');",
      "  }",
      "",
      "  return ctx;",
      "};",
      "",
      "type ${1:${TM_FILENAME_BASE}}Props<T extends React.ElementType> = {} & Component<T>;",
      "",
      "export function ${1:${TM_FILENAME_BASE}}({",
      "  children,",
      "  className,",
      "  ...restProps",
      "}: ${1:${TM_FILENAME_BASE}}Props<'${3:div}'>) {",
      "  const ctxValue = useMemo((): ${2:${TM_FILENAME_BASE}}ContextValue => ({}), []);",
      "",
      "  return (",
      "    <${2:${TM_FILENAME_BASE}}Context.Provider value={ctxValue}>",
      "      <${3:div} className={tw('', className)} {...restProps}>",
      "        {children}",
      "      </${3:div}>",
      "    </${2:${TM_FILENAME_BASE}}Context.Provider>",
      "  );",
      "}",
      ""
    ],
    "description": "Context 있는 Tailwind 컴포넌트"
  },
  "Tailwind 컴포넌트": {
    "prefix": "tc",
    "body": [
      "type ${1:${TM_FILENAME_BASE}}Props<T extends React.ElementType> = {} & Component<T>;",
      "",
      "export function ${1:${TM_FILENAME_BASE}}({",
      "  children,",
      "  className,",
      "  ...restProps",
      "}: ${1:${TM_FILENAME_BASE}}Props<'${2:div}'>) {",
      "  return (",
      "    <${2:div} className={tw('', className)} {...restProps}>",
      "      {children}",
      "    </${2:div}>",
      "  );",
      "}",
      ""
    ],
    "description": "Tailwind 컴포넌트"
  },
  "Compound Tailwind 컴포넌트": {
    "prefix": "tccompound",
    "body": [
      "type ${1:MyComponent}Props<T extends React.ElementType> = {} & Component<T>;",
      "",
      "function ${1:MyComponent}({",
      "  children,",
      "  className,",
      "  ...restProps",
      "}: ${1:MyComponent}Props<'${2:div}'>) {",
      "  return (",
      "    <${2:div} className={tw('', className)} {...restProps}>",
      "      {children}",
      "    </${2:div}>",
      "  );",
      "}",
      "",
      "${3:${TM_FILENAME_BASE}}.${1:MyComponent} = ${1:MyComponent}"
    ],
    "description": "Compound Tailwind 컴포넌트"
  },
  "Import Context ": {
    "prefix": "ipcontext",
    "body": ["import { useContext, useMemo, createContext } from 'react';"],
    "description": "Import Context "
  },
  "Import tailwind-merge": {
    "prefix": "iptwm",
    "body": ["import { tw } from '@/utils/tailwindMerge';"],
    "description": "Import tailwind-merge"
  },
  "TypeScript 스토리 생성": {
    "prefix": "tsstory",
    "body": [
      "import type { ComponentMeta, ComponentStory } from '@storybook/react';",
      "",
      "import { ${1:Component} } from './${1:Component}';",
      "",
      "const meta = {",
      "  component: ${1:Component},",
      "  title: '${2:Directory}/${1:Component}',",
      "  parameters: {",
      "    design: {",
      "      type: 'figma',",
      "      url: '${3:figmaURL}',",
      "    },",
      "  },",
      "} as ComponentMeta<typeof ${1:Component}>;",
      "",
      "export default meta;",
      "",
      "const Template: ComponentStory<typeof ${1:Component}> = (args) => <${1:Component} {...args} />;",
      "",
      "export const Default = Template.bind({});",
      "",
      "Default.args = {}"
    ],
    "description": "TypeScript 스토리 생성"
  }
```