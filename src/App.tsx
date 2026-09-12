/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { PublicWeddingPage } from './pages/PublicWeddingPage';
import { LandingPage } from './pages/LandingPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInvitationsListPage } from './pages/admin/AdminInvitationsListPage';
import { AdminInvitationEditorPage } from './pages/admin/AdminInvitationEditorPage';
import { AdminTemplatesPage } from './pages/admin/AdminTemplatesPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Public Wedding Page by slug (e.g. /shofwan-allya) */}
              <Route path="/:slug" element={<PublicWeddingPage />} />

              {/* Admin Preview Mode */}
              <Route path="/preview/:id" element={<PublicWeddingPage isPreview={true} />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Studio */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="invitations" element={<AdminInvitationsListPage />} />
                <Route path="invitations/:id/edit" element={<AdminInvitationEditorPage />} />
                <Route path="templates" element={<AdminTemplatesPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

