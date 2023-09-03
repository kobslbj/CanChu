// // module.exports = {
// //   env: {
// //     browser: true,
// //     es2021: true,
// //   },
// //   extends: ['plugin:@next/next/recommended','airbnb',"prettier" ],
// //   overrides: [
// //     {
// //       env: {
// //         node: true,
// //       },
// //       files: [
// //         '.eslintrc.{js,cjs}',
// //       ],
// //       parserOptions: {
// //         sourceType: 'script',
// //       },
// //     },
// //   ],
// //   parserOptions: {
// //     ecmaVersion: 'latest',
// //     sourceType: 'module',
// //   },
// //   rules: {
// //   }
// // };

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   // extends: 'airbnb',
//   extends: ['next', 'next/core-web-vitals', 'airbnb', 'eslint:recommended', 'prettier'],
//   plugins: ['prettier'],
//   // overrides: [
//   //   {
//   //     env: {
//   //       node: true,
//   //     },
//   //     files: [".eslintrc.{js,cjs}"],
//   //     parserOptions: {
//   //       sourceType: "script",
//   //     },
//   //   },
//   // ],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   // rules: {},
//   rules: {
//     'prettier/prettier': 'error',
//     'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
//     'import/extensions': 'off',
//     'object-curly-newline': 'off',
//     'react/prop-types': 'off',
//     'react/react-in-jsx-scope': 'off',
//     camelcase: 'off',
//   },

//   settings: {
//     'import/resolver': {
//       alias: {
//         map: [['@', './']],
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
// };
