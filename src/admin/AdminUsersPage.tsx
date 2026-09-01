import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { AdminRole, AdminUser } from "../types";
import {
  UserCheck,
  UserPlus,
  Trash2,
  Edit2,
  X,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

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
  const [role, setRole] = useState<AdminRole>("admin");
  const [isActive, setIsActive] = useState(true);

  const isSuperAdmin = adminUser?.role === "superadmin";

  const handleOpenAdd = () => {
    setName("");
    setEmail("");
    setPhone("");
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
    setRole(user.role);
    setIsActive(user.isActive);
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
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
      addAdminUser({
        name,
        email,
        phone,
        role,
        isActive,
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

  const roleDescMap: Record<AdminRole, string> = {
    superadmin: "Unrestricted access to all modules, admin users, settings, and logs.",
    admin: "Full control over products, inventory, orders, coupons, reviews, and CMS.",
    order_manager: "Scoped access to order processing, customer records, and inventory.",
    content_manager: "Scoped access to homepage CMS, notification bar, reviews, and lookbook.",
  };

  const roleBadgeColors: Record<AdminRole, string> = {
    superadmin: "bg-amber-100 text-amber-900 border-amber-300",
    admin: "bg-blue-100 text-blue-900 border-blue-300",
    order_manager: "bg-emerald-100 text-emerald-900 border-emerald-300",
    content_manager: "bg-purple-100 text-purple-900 border-purple-300",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Admin Users & RBAC" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Admin User Management & Role Permissions
          </h1>
        </div>

        {isSuperAdmin && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs self-start sm:self-auto min-h-[44px]"
          >
            <UserPlus className="w-4 h-4" /> Add Admin User
          </button>
        )}
      </div>

      {/* Role Summary Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {(["superadmin", "admin", "order_manager", "content_manager"] as AdminRole[]).map((r) => (
          <div key={r} className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${roleBadgeColors[r]}`}>
                  {roleLabelMap[r]}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  {adminUsers.filter((u) => u.role === r).length} users
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed m-0">
                {roleDescMap[r]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 m-0">
              Active Administrative Team ({adminUsers.length})
            </h3>
            <p className="text-xs text-neutral-500 m-0 mt-0.5">
              Verified operators with permission scopes and session access.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Operator Name</th>
                <th className="py-3 px-4">Role & Scope</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {adminUsers.map((user) => {
                const isCurrent = user.id === adminUser?.id;

                return (
                  <tr key={user.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center font-bold text-neutral-700 text-xs shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-neutral-900">
                              {user.name}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] bg-brand text-brand-foreground px-1.5 py-0.2 rounded-xs uppercase font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-500 block">
                            ID: {user.id} • Created: {user.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border inline-block ${roleBadgeColors[user.role]}`}>
                        {roleLabelMap[user.role]}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <span className="text-neutral-900 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-neutral-400" /> {user.email}
                        </span>
                        {user.phone && (
                          <span className="text-neutral-500 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-neutral-400" /> {user.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {user.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-sm">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-neutral-500 text-[11px]">
                      {user.lastLogin || "No recorded login"}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isSuperAdmin ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-neutral-600 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                            title="Edit User Role / Details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {!isCurrent && (
                            <button
                              onClick={() => setUserToDelete(user)}
                              className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                              title="Delete Admin Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-[11px] italic">View Only</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-neutral-900 text-base m-0">
                  {editingUser ? "Edit Admin User Details" : "Create New Admin User"}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Operator Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meera Kapadia"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@evaravastra.com"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Security Role & Permission Scope
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none font-semibold cursor-pointer"
                >
                  <option value="superadmin">Super Admin (Full Platform Access)</option>
                  <option value="admin">Store Admin (Catalog, Orders, Marketing, Content)</option>
                  <option value="order_manager">Order Manager (Fulfillment, Orders, Customers)</option>
                  <option value="content_manager">Content Lead (CMS, Notification Bar, Lookbook)</option>
                </select>
                <span className="text-[11px] text-neutral-500 block mt-1">
                  {roleDescMap[role]}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-brand rounded-xs"
                />
                <label htmlFor="isActiveToggle" className="text-xs text-neutral-700 font-medium cursor-pointer">
                  Account is Active & Permitted to Sign In
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-brand-foreground text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-hover transition-colors"
                >
                  {editingUser ? "Save Changes" : "Create Admin User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border border-red-200 rounded-sm max-w-sm w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                Delete Admin User?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Are you sure you want to revoke access and delete the account for{" "}
                <strong>{userToDelete.name}</strong> ({userToDelete.email})? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-800 transition-colors flex-1"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
