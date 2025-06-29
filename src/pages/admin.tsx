import { useState } from 'react';
import Layout from '@/components/Layout';
//import { mockUsers } from '@/utils/api';

interface User {
    id: string;
    credits: number;
    raffleEntries: number;
}

export default function AdminPage() {
    const [users] = useState<User[]>(mockUsers);

    return (
        <Layout title="Admin Panel" includeRaffleWidget={false}>
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-xl font-semibold bg-gray-100 p-4 border-b">User Statistics</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Credits
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Raffle Entries
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.credits}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.raffleEntries}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No user data available
                        </div>
                    )}
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">System Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-medium text-green-800">Active Users</h3>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium text-blue-800">Total Credits</h3>
                            <p className="text-2xl font-bold">{users.reduce((sum, user) => sum + user.credits, 0)}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-medium text-purple-800">Total Raffle Entries</h3>
                            <p className="text-2xl font-bold">{users.reduce((sum, user) => sum + user.raffleEntries, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
