import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { AdminRole, AdminUser } from "../types";
import {
  UserPlus,
  Trash2,
  Edit2,
  X,
} from "lucide-react";
import { hashPassword } from "../lib/auth/password";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect } from "../components/admin/ui/AdminInputs";

export const AdminUsersPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { adminUsers, adminUser, addAdminUser, updateAdminUser, deleteAdminUser } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("admin");
  const [isActive, setIsActive] = useState(true);

  const isSuperAdmin = adminUser?.role === "superadmin";

  const handleOpenAdd = () => {
    setName("");
    setEmail("");
    setPhone("");
    setInitialPassword("");
    setRole("admin");
    setIsActive(true);
    setEditingUser(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || "");
    setInitialPassword("");
    setRole(user.role);
    setIsActive(user.isActive);
    setIsAddModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      updateAdminUser(editingUser.id, {
        name,
        email,
        phone,
        role,
        isActive,
      });
    } else {
      const passwordToHash = initialPassword || "EvaraAdmin@2026Secure!";
      const hash = await hashPassword(passwordToHash);

      addAdminUser({
        name,
        email,
        phone,
        role,
        isActive,
        passwordHash: hash,
        avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?q=80&w=200&auto=format&fit=crop`,
      });
    }

    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteAdminUser(userToDelete.id);
    setUserToDelete(null);
  };

  const roleLabelMap: Record<AdminRole, string> = {
    superadmin: "Super Admin",
    admin: "Store Admin",
    order_manager: "Order Manager",
    content_manager: "Content Lead",
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Admin Staff & RBAC Roles"
        description="Manage authenticated staff accounts, role-based module access rights, and security permissions."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "User Management" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {adminUsers.length} Staff Accounts
          </AdminBadge>
        }
        actions={
          isSuperAdmin ? (
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
            >
              <UserPlus className="w-4 h-4" /> Add Admin User
            </button>
          ) : undefined
        }
      />

      {/* 2. Responsive Grid of Admin Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {adminUsers.map((u) => (
          <AdminCard key={u.id} noPadding className="flex flex-col justify-between">
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#734E06]/10 text-[#734E06] flex items-center justify-center font-bold text-base border border-[#734E06]/20 shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-neutral-900 block">{u.name}</strong>
                    <span className="text-xs text-neutral-500 block">{u.email}</span>
                  </div>
                </div>

                <AdminBadge variant={u.isActive ? "success" : "neutral"} size="sm">
                  {u.isActive ? "Active" : "Disabled"}
                </AdminBadge>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xs space-y-1.5 text-xs text-neutral-700">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Assigned Role:</span>
                  <AdminBadge variant="brand" size="sm">
                    {roleLabelMap[u.role] || u.role}
                  </AdminBadge>
                </div>
                {u.phone && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Hotline:</span>
                    <span className="font-mono text-neutral-800">{u.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500">Last Sign In:</span>
                  <span className="font-mono text-neutral-800">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never"}
                  </span>
                </div>
              </div>
            </div>

            {isSuperAdmin && (
              <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(u)}
                  className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                {u.id !== adminUser?.id && (
                  <button
                    onClick={() => setUserToDelete(u)}
                    className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      {/* 3. Add/Edit Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                {editingUser ? `Edit ${editingUser.name}` : "Create Staff Account"}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <AdminField label="Full Name" required>
                <AdminInput
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Darshil Tailor"
                />
              </AdminField>

              <AdminField label="Corporate Email" required>
                <AdminInput
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@evaravastra.com"
                />
              </AdminField>

              <AdminField label="Phone Hotline">
                <AdminInput
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </AdminField>

              {!editingUser && (
                <AdminField label="Initial Password" hint="Default: EvaraAdmin@2026Secure!">
                  <AdminInput
                    type="password"
                    value={initialPassword}
                    onChange={(e) => setInitialPassword(e.target.value)}
                    placeholder="Set temporary login password"
                  />
                </AdminField>
              )}

              <AdminField label="Role & Access Scope" required>
                <AdminSelect
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                >
                  <option value="superadmin">Super Admin (Full Root Permissions)</option>
                  <option value="admin">Store Admin (Catalog, Orders, Inventory)</option>
                  <option value="order_manager">Order Manager (Orders & Shiprocket)</option>
                  <option value="content_manager">Content Lead (CMS & Lookbooks)</option>
                </AdminSelect>
              </AdminField>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs"
                >
                  {editingUser ? "Update Staff" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirm Modal */}
      {userToDelete && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
          onClick={() => setUserToDelete(null)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 mb-1.5">
                Revoke Staff Account?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 m-0">
                Are you sure you want to permanently revoke credentials for <strong>{userToDelete.name}</strong> ({userToDelete.email})?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="h-10 px-4 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex-1"
              >
                Revoke Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
