# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



mobile-app/
│── app/                     # expo-router (hoặc navigation chính)
│   ├── index.tsx            # màn hình chính (entry point)
│   ├── auth/                # nhóm màn hình liên quan đến đăng nhập
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── home/                # nhóm màn hình home
│   │   ├── index.tsx
│   │   └── details.tsx
│   └── profile/             # nhóm màn hình profile
│       └── index.tsx
│
│── src/                     # code chính của app
│   ├── assets/              # ảnh, font, icons tĩnh
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/          # các component tái sử dụng
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Header.tsx
│   │
│   ├── constants/           # hằng số dùng chung (màu sắc, API url,...)
│   │   ├── colors.ts
│   │   ├── api.ts
│   │   └── routes.ts
│   │
│   ├── hooks/               # custom hooks
│   │   └── useAuth.ts
│   │
│   ├── navigation/          # điều hướng (nếu không dùng expo-router)
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   │
│   ├── screens/             # các màn hình chính (nếu không để trong app/)
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   │
│   ├── services/            # gọi API, xử lý dữ liệu
│   │   ├── apiClient.ts
│   │   └── userService.ts
│   │
│   ├── store/               # state management (Redux / Zustand / Context)
│   │   ├── index.ts
│   │   └── userSlice.ts
│   │
│   └── utils/               # hàm helper, validate, format
│       ├── date.ts
│       ├── number.ts
│       └── string.ts
│
│── .expo/                   # expo config
│── node_modules/
│── package.json
│── tsconfig.json
│── app.json
│── README.md
