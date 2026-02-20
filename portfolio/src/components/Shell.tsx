"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AskMarttaDrawer from "./AskMarttaDrawer";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "stretch" }}>
      {/* Main content column — shrinks when sidebar opens */}
      <div
        onClick={() => {
          if (drawerOpen) setDrawerOpen(false);
        }}
        style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Navbar onAskMartta={() => setDrawerOpen(true)} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>

      {/* Push sidebar — animates width, content stays behind */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="sidebar"
            initial={{ width: 0 }}
            animate={{ width: 380 }}
            exit={{ width: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
            style={{ flexShrink: 0, overflow: "hidden", position: "sticky", top: 0, height: "100vh" }}
          >
            <AskMarttaDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
