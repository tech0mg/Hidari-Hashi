"use client";
import { useRouter, usePathname } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得

  const navigateTo = (destination) => {
    const pageMatch = pathname.match(/page(\d+)/);
    const currentPage = pageMatch ? parseInt(pageMatch[1], 10) : null;

    if (currentPage !== null) {
      if (destination === "next") {
        router.push(`/customers/shiori/page${currentPage + 1}`);
      } else if (destination === "prev") {
        router.push(`/customers/shiori/page${currentPage - 1}`);
      } else {
        const routes = {
          "list-detail": "/customers/list/list-detail",
          list: "/customers/list",
        };

        if (routes[destination]) {
          router.push(routes[destination]);
        }
      }
    } else {
      console.error("現在のページ番号を解析できませんでした");
    }
  };

  return { navigateTo };
};
