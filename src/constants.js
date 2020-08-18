import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUser($userId: String) {
        user(id: $userId) {
            id
            totalCount
            completedCount
            todos {
                id
                text
                complete
            }
        }
    }
`;
