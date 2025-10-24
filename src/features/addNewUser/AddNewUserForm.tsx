import { useCreateUserMutation, useFetchUserTableDataQuery } from "@/entities/user-table/services/user-table.api";
import type { CreateUserData } from "@/shared/types/user-table.types";
import { Button, Flex, Input, message, Modal, Radio, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";


const { Text } = Typography;


interface AddNewUserFormModalProps {
    isModalOpen: boolean;
    onClose: () => void;
}


export default function AddNewUserFormModal({ isModalOpen, onClose }: AddNewUserFormModalProps) {
    const [createUser] = useCreateUserMutation();
    const { refetch } = useFetchUserTableDataQuery();
    const [messageApi, contextHolder] = message.useMessage();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserData>({
        defaultValues: {
            first_name: '',
            last_name: '',
            gender: 'man',
            email: '',
            category: 'A',
        }
    });

    const onSubmit = async (data: CreateUserData) => {
        console.log(data);

        try {
            await createUser(data).unwrap();
            messageApi.success('Пользователь успешно добавлен');
            await refetch();
            reset();
            onClose();
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            messageApi.error('Ошибка при добавлении пользователя');
        }
    }

    function handleCancel() {
        reset();
        onClose();
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Добавить нового клиента"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            // closable={!isLoading}
            >
                {
                    isModalOpen &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex vertical gap={16}>


                            <div>
                                <Controller
                                    name="first_name"
                                    control={control}
                                    rules={{
                                        required: "Имя обязательно для заполнения",
                                        minLength: {
                                            value: 2,
                                            message: "Имя должно содержать минимум 2 символа"
                                        },
                                        pattern: {
                                            value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
                                            message: "Имя может содержать только буквы, пробелы и дефисы"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Имя"
                                            variant="filled"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.first_name && (
                                    <Text type="danger">
                                        {errors.first_name.message}
                                    </Text>
                                )}
                            </div>


                            <div>
                                <Controller
                                    name="last_name"
                                    control={control}
                                    rules={{
                                        required: "Фамилия обязательна для заполнения",
                                        minLength: {
                                            value: 2,
                                            message: "Фамилия должна содержать минимум 2 символа"
                                        },
                                        pattern: {
                                            value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
                                            message: "Фамилия может содержать только буквы, пробелы и дефисы"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Фамилия"
                                            variant="filled"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.last_name && (
                                    <Text type="danger">
                                        {errors.last_name.message}
                                    </Text>
                                )}

                            </div>




                            <div>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email обязателен для заполнения",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Введите корректный email адрес"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Email"
                                            variant="filled"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <Text type="danger">
                                        {errors.email.message}
                                    </Text>
                                )}


                            </div>

                            <Controller
                                name="category"
                                control={control}
                                rules={{
                                    required: "Выберите категорию"
                                }}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Категория"
                                        defaultValue="A"
                                        // style={{ width: 120 }}
                                        options={[
                                            { value: 'A', label: 'A' },
                                            { value: 'B', label: 'B' },
                                            { value: 'C', label: 'C' },
                                            { value: 'D', label: 'D' },
                                        ]}
                                        {...field}
                                    />
                                )}
                            />
                            <div style={{ width: '100%' }}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        required: "Пол обязателен для заполнения"
                                    }}
                                    render={({ field }) => (
                                        <Radio.Group
                                            buttonStyle="solid"
                                            style={{ width: '100%', display: 'flex' }}
                                            {...field}
                                        >
                                            <Radio.Button
                                                value="man"
                                                style={{ flex: 1, textAlign: 'center' }}
                                            >
                                                Мужчина
                                            </Radio.Button>
                                            <Radio.Button
                                                value="woman"
                                                style={{ flex: 1, textAlign: 'center' }}
                                            >
                                                Женщина
                                            </Radio.Button>
                                        </Radio.Group>
                                    )}
                                />
                                {errors.gender && (
                                    <Text type="danger">
                                        {errors.gender.message}
                                    </Text>
                                )}
                            </div>

                            <Button style={{ width: '50%', margin: '0 auto' }} variant="filled" color="primary" htmlType="submit">Добавить клиента</Button>
                        </Flex>

                    </form>
                }
            </Modal >
        </>
    )
}
