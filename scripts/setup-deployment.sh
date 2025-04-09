#!/bin/bash
# GMOクラウドサーバーでデプロイの準備をするためのスクリプト

# エラーが発生したら停止する
set -e

# 変数設定
DEPLOY_USER="deployer"  # デプロイ用ユーザー名
DEPLOY_DIR="/var/www/html/bridge"  # デプロイ先ディレクトリ
SSH_DIR="/home/$DEPLOY_USER/.ssh"  # SSH設定ディレクトリ

echo "===== デプロイ環境のセットアップを開始します ====="

# 必要なパッケージのインストール
echo "必要なパッケージをインストールしています..."
apt-get update
apt-get install -y rsync openssh-server

# デプロイ用ユーザーの作成
if id "$DEPLOY_USER" &>/dev/null; then
    echo "ユーザー $DEPLOY_USER は既に存在します"
else
    echo "デプロイ用ユーザー $DEPLOY_USER を作成しています..."
    useradd -m -s /bin/bash $DEPLOY_USER
    passwd -l $DEPLOY_USER  # パスワードログインを無効化
fi

# デプロイディレクトリの作成
echo "デプロイディレクトリを作成しています..."
mkdir -p $DEPLOY_DIR
chown -R $DEPLOY_USER:$DEPLOY_USER $DEPLOY_DIR
chmod -R 755 $DEPLOY_DIR

# SSH設定
echo "SSH設定を準備しています..."
mkdir -p $SSH_DIR
chmod 700 $SSH_DIR
touch $SSH_DIR/authorized_keys
chmod 600 $SSH_DIR/authorized_keys
chown -R $DEPLOY_USER:$DEPLOY_USER $SSH_DIR

echo ""
echo "===== セットアップ完了 ====="
echo ""
echo "セットアップが完了しました。以下の手順を実行してください："
echo ""
echo "1. デプロイに使用するSSH公開鍵を $SSH_DIR/authorized_keys に追加してください"
echo "   例: echo 'ssh-rsa AAAA...' >> $SSH_DIR/authorized_keys"
echo ""
echo "2. サーバーのSSHフィンガープリントを取得し、GitHubのシークレットに保存してください："
echo "   ssh-keyscan $(hostname -f) 2>/dev/null"
echo ""
echo "3. GitHubリポジトリのシークレットに以下の値を設定してください："
echo "   - SSH_USERNAME: $DEPLOY_USER"
echo "   - SSH_HOST: $(hostname -f)"
echo "   - REMOTE_PATH: $DEPLOY_DIR"
echo "" 