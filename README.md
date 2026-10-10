<div align="center">

# 🛒 Bazar Dor (বাজার দর)

**A modern, real-time daily commodity price tracker built for Bangladesh.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3%2Fv4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Component%20Library-5A0E2D?style=for-the-badge&logo=daisyui)](https://daisyui.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-Authentication-008744?style=for-the-badge)](https://www.better-auth.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 📌 Overview

**Bazar Dor** is a clean, accessible web application designed to help consumers track real-time daily market prices of essential groceries and commodities in Bangladesh. Featuring localized Bengali microcopy, user profile management, OAuth integrations, interactive error handling, and category filtering.

---

## ✨ Features

- 📊 **Real-time Price Grid**: Clear visual breakdown of daily market rates, weight units, and percentage shifts.
- 📂 **Dynamic Category Navigation**: Easily filter items by category (Rice, Lentils, Oil, Vegetables, etc.) with active route indicators.
- 🔐 **Authentication & User Profiles**:
  - Email/Password sign-up and sign-in.
  - One-click OAuth login with **Google** and **GitHub**.
  - Dynamic profile page with user session data and profile updates powered by **Better Auth**.
- 🎨 **Minimalist Green Theme**: Thoughtfully designed with soft neutral light backgrounds (`#f3f6f3`) and primary brand accents (`#008744`).
- ⚡ **Skeleton Loading States**: Seamless loading screens matching the exact structure of item grids to prevent UI layout shifts.
- 🚫 **Custom 404 & Error Handling**: Modern interactive search recovery dead-end pages.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React Server & Client Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) (`@/lib/auth-client`)
- **Icons**: `react-icons` (FontAwesome, Flat Color Icons, Feather Icons)
- **Notifications**: `react-toastify`

---

## 📁 Project Structure

```text
├── app/
│   ├── category/
│   │   └── [slug]/          # Category filtered pages
│   ├── profile/             # User profile page
│   ├── signin/              # Sign In page
│   ├── signup/              # Sign Up page
│   ├── not-found.tsx        # Custom 404 error page
│   ├── loading.tsx          # Skeleton pulse loader
│   ├── layout.tsx           # Main application wrapper
│   └── page.tsx             # Homepage with product grid
├── components/
│   └── NavLinks.tsx         # Active-aware category navigation menu
├── lib/
│   └── auth-client.ts       # Better Auth client config
└── public/                  # Assets and images
```
