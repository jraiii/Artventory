// src/routes/admin/+page.server.ts
export const load = async () => {
  // 🚧 TEMPORARY: Bypass login for testing UI
  const user = { name: 'Dev Admin', isAdmin: true };

  return {
    user,
    stats: {
      totalSales: 15800,
      totalOrders: 47,
      totalProducts: 23
    }
  };
};
