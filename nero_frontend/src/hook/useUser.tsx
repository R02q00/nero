'use client'
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await api.get('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (err:any) {
                setError(err.response?.data || 'Failed to fetch user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, []);

    return { user, loading, error };
}